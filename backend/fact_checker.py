import time
from flask import Blueprint, request, jsonify
from openai import OpenAI
import io
from bs4 import BeautifulSoup
import urllib.parse
import requests
from os import environ

from dotenv import load_dotenv
load_dotenv()

client = OpenAI(api_key=environ.get('API_KEY'))

bp = Blueprint('admin', __name__)

def transcribe(audio_file):
    buffer = io.BytesIO(audio_file.read())
    extension = audio_file.filename.split(".")[-1]
    buffer.name = "file" + "." + extension
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=buffer,
    )
    return transcription.text

def extract_key_points(text):

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "Soy un experto en síntesis de información, capaz de identificar y articular los puntos clave de cualquier documento de manera integral y detallada, sintetizando los puntos clave en oraciones que contengan 20 palabras. En mi análisis, cada punto clave se presenta con contexto completo y detalles cuantificables, asegurando una comprensión exhaustiva de los aspectos más críticos. Por ejemplo, en la preparación de un lanzamiento de producto, no solo menciono las fechas y actividades clave, sino que también incorporo los márgenes de tiempo por imprevistos y las estrategias de marketing, proporcionando una visión clara y completa de la situación. Cada elemento informativo se estructura meticulosamente, permitiendo a los stakeholders hacer seguimiento efectivo y tomar decisiones informadas basadas en datos concretos. Cada punto clave lo presento usando bullets y en formato de afirmación.",
            },
            {
                "role": "user",
                "content": text,
            },
        ],
    )
    response_text = completion.choices[0].message.content

    return response_text


def recomendar_sitios_web(statement):
    prompt = f"Dame 5 sitios web donde pueda verificar si esta afirmación es verdadera o falsa. Dame solo el nombre de dominio, sin URL. Enumera en formato: '1.' '{statement}'"
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt
            },
        ],
    )
    respuesta = completion.choices[0].message.content

    sitios_web = [line.split(".")[1].strip() for line in respuesta.split("\n") ]
    return sitios_web

def obtener_url_sitio(statement, sitio):
    query = f"Es cierto que {statement}, de acuerdo con {sitio}?"
    query_encoded = urllib.parse.quote(query)
    
    # URL de búsqueda de Google
    url = f"https://www.google.com/search?q={query_encoded}"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    print(response.status_code)

    
    # Verificar si la solicitud fue exitosa
    if response.status_code != 200:
        return None
    
    # Parsear el contenido HTML
    soup = BeautifulSoup(response.content, "html.parser")
    
    # Buscar el primer resultado
    search_results = soup.find_all('div', class_='tF2Cxc')
    if not search_results:
        return None
    
    # Extraer la URL del primer resultado
    first_result = search_results[0]
    link = first_result.find('a')['href']
    return link

def obtener_informacion_sitio(url):
    response = requests.get(url)
    
    # If the request is successful (status code 200), proceed
    if response.status_code == 200:
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all <p> tags
        p_tags = soup.find_all('p')
        
        # Extract text from each <p> tag and concatenate them into a single paragraph
        concatenated_paragraph = ' '.join([p.get_text() for p in p_tags])
        
        # Process each image and get explanations
        return concatenated_paragraph
    else:
        return "Failed to retrieve the URL. Status code: {}".format(response.status_code)

@bp.route('/api/fact-check', methods=['POST'])
def fact_check():
    if 'file' not in request.files:
        return "No file part", 400
    
    file = request.files['file']

    transcription_text = transcribe(file)
    # print(transcription_text)
    # return transcription_text, 200
    # transcription_text = "Vamos a empezar con las buenas noticias. En términos generales, el planeta Tierra está bien. De hecho, los humanos están mejor que en cualquier otro momento de la historia. En los últimos cien años, cuando las temperaturas han aumentado aproximadamente dos grados Fahrenheit, la población mundial ha aumentado en 6 mil millones de personas, mientras que la pobreza global ha disminuido sustancialmente. Y el número de personas que mueren por desastres meteorológicos ha disminuido en un 97% en términos per cápita. Obviamente, no estamos enfrentando una crisis existencial. Cualquiera que te diga que sí lo estamos no está prestando atención a los datos históricos. En cambio, están preocupados por lo que “podría” pasar en el futuro, basándose en predicciones de modelos climáticos inadecuados, impulsados por suposiciones poco realistas.Ofrezco este diagnóstico positivo después de una vida de estudio sobre el tema. Hasta hace poco, fui profesora de ciencias del clima y directora de la Escuela de Ciencias de la Tierra y la Atmósfera en el Instituto de Tecnología de Georgia. Pero no todo son buenas noticias. El mayor problema con el cambio climático no es el cambio climático en sí, sino cómo estamos lidiando con él. Estamos intentando controlar lo incontrolable, a un gran costo, eliminando urgentemente los combustibles fósiles. Hemos fallado en colocar adecuadamente los riesgos del cambio climático en el contexto de otros desafíos que enfrenta el mundo.El cambio climático se ha convertido en un chivo expiatorio conveniente. Como resultado, estamos descuidando las verdaderas causas de estos problemas. Hay innumerables ejemplos, pero déjame darte solo uno. El lago Chad en África se está reduciendo. El presidente de Nigeria, Muhammadu Buhari, lo culpa a lo que tú sabes. “El cambio climático”, proclamó, “es en gran medida responsable de la desecación del lago Chad…” Pero no es así. Sí, la disminución inicial del nivel del agua fue causada por largas sequías en las décadas de 1970 y 1980. Pero el lago ha permanecido prácticamente vacío durante las últimas dos décadas, incluso mientras las lluvias se han recuperado. Durante este tiempo, los ríos que fluyen hacia el lago desde Camerún, Chad y Nigeria han sido desviados por agencias gubernamentales para irrigar ineficientes cultivos de arroz. En resumen, el cambio climático tiene poco que ver con la disminución del nivel del agua del lago Chad. En cambio, las malas decisiones humanas son la causa. El cambio climático es solo una excusa conveniente que oculta la mala gestión y gobernanza.Culpar de cada gran desastre meteorológico al calentamiento global causado por el hombre desafía el sentido común, así como el registro de datos históricos. Durante los últimos 50 años, el clima global ha sido bastante benigno. En los EE. UU., las peores olas de calor, sequías y huracanes ocurrieron en la década de 1930, mucho peor que cualquier cosa que hayamos experimentado hasta ahora en el siglo XXI. El crecimiento de la población, dónde y cómo vive la gente, y cómo los gobiernos gestionan los recursos tienen muchas más probabilidades de crear condiciones para un desastre que el clima mismo. Siempre hemos tenido huracanes, sequías e inundaciones, y siempre los tendremos.Tal vez pienses que estoy siendo demasiado despreocupada sobre los peligros que enfrentamos. ¿No es cierto que el 97% de los científicos están de acuerdo en que los humanos están causando un cambio climático peligroso? Bueno, esto es lo que realmente todos los científicos del clima están de acuerdo: La temperatura promedio de la superficie global ha aumentado en los últimos 150 años. Los humanos están añadiendo dióxido de carbono a la atmósfera al quemar combustibles fósiles. Y las emisiones de dióxido de carbono tienen un efecto de calentamiento en el planeta. Sin embargo, los científicos del clima no están de acuerdo en los temas más importantes: Cuánto calentamiento está asociado con nuestras emisiones. Si este calentamiento es mayor que la variabilidad climática natural. Y cuánto cambiará el clima en el futuro. Hay mucho que aún no entendemos sobre cómo funciona el clima. Los patrones de circulación oceánica y las variaciones en las nubes tienen un gran impacto. Pero los modelos climáticos hacen un mal trabajo al predecir estos. Las variaciones en el sol y las erupciones volcánicas también tienen un impacto sustancial, pero estos son simplemente impredecibles.El hecho es que no podemos predecir el clima futuro. Simplemente no es posible. Y todos deberían reconocer eso. Y todos los científicos lo hacen. Aunque los humanos influyen en el clima, no podemos controlarlo. Pensar que podemos es el colmo de la arrogancia, la palabra griega para exceso de confianza.Lo que podemos hacer es adaptarnos a lo que sea que la Madre Naturaleza nos arroje. Los seres humanos tienen una larga historia de ser muy buenos en eso. Podemos construir diques, podemos gestionar mejor nuestros recursos hídricos e implementar mejores protocolos de advertencia y gestión de desastres. Estas son cosas que podemos controlar. Si nos enfocamos en eso, hay todas las razones para ser optimistas sobre nuestro futuro."

    statements = extract_key_points(transcription_text)

    statements = statements.split("-")[1:]
    statements = [statement.strip() for statement in statements]

    fact_check = []

    for statement in statements:
        sources = []
        sitios_web = recomendar_sitios_web(statement)
        for sitio in sitios_web:
            time.sleep(1)
            url = obtener_url_sitio(statement, sitio)
            evidencia = ""
            if(url):
                sources.append(url)
                evidencia += obtener_informacion_sitio(url)

        prompt = f"Basado en la evidencia {evidencia}. Determina si la siguiente información es verdadera, falsa, parcialmente verdadera, o parcialmente falsa. Explica tu decision en un parrafo. {statement}"
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                },
            ],
        )

        veredict = completion.choices[0].message.content
        fact_check.append({
            "statement": statement,
            "sources": sources,
            "veredict": veredict
        })


    return jsonify(fact_check), 200
