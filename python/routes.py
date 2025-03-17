from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from services.evaluate_speech import get_audio_pitch_eval, get_audio_rhythm_eval

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/upload-audio', methods=['POST'])
def upload_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    text = request.form.get('text', None)
    situation = request.form.get('situation', None)

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    file_bytes = file.read()

    result_pitch, result_rhythm = get_audio_pitch_eval(file_bytes, text, situation), get_audio_rhythm_eval(file_bytes, text, situation)

    response = jsonify({"status": "success", "pitch": result_pitch, "rhythm": result_rhythm})
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response