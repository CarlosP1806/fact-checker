# Fact Mobile

Integrantes:
Osmar Araico Gonzalez
José Antonio Pacheco Chargoy
Eashley Brittney Martínez Vergara
Carlos Alberto Páez de la Cruz

## Setup

Para installar el proyecto, es necesario seguir los siguientes pasos:

1) Clonar el repositorio en local
```
> Git clone git@github.com:CarlosP1806/fact-checker.git
```
2) Obtener una llave privada para API de OpenAI
3) Crear un archivo .env dentro de la carpeta backend. Agregar lo siguiente:
```
API_KEY=your_key
```
4) Crear un entorno virtual llamado venv dentro de la carpeta raíz del repositorio
```
> python -m venv venv
```
5) Activar el entorno e instalar las dependencias necesarias
```
> source venv/bin/activate
> pip install -r requirements.txt
```
6) Instalar las dependencias necesarias dentro de la carpeta facmobile (frontend)
```
> npm install
```
7) Correr servidor de Flask en puerto 3001 (desde carpeta raiz)
```
> flask --app backend run --port 3001
```
8) Correr servidor de React (desde carpeta factmobile)
```
> npm start
```

Link al video:
https://drive.google.com/file/d/10LU7rCFX6e0YX0xvR9Wyw2s1RGOw4Hp0/view?usp=sharing