# server.py
from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = "5d336df03a293338648ef0478999076c"

@app.route('/')
def home():
    return "Tiren Parleys API funcionando correctamente ✅"

@app.route('/api/pronosticos', methods=['POST'])
def pronosticos():
    try:
        data = request.get_json()
        mensaje = data.get("mensaje", "Dame tres pronósticos realistas para los partidos de fútbol de hoy con breve explicación.")
        
        respuesta = openai.ChatCompletion.create(
            model="gpt-5",
            messages=[
                {"role": "system", "content": "Eres un analista deportivo experto en fútbol y apuestas. Responde siempre en formato breve y claro."},
                {"role": "user", "content": mensaje}
            ]
        )
        
        texto = respuesta.choices[0].message["content"]
        return jsonify({"resultado": texto})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
