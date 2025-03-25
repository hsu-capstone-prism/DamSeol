import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from services.evaluate_speech import get_audio_pitch_eval, get_audio_rhythm_eval
from services.evaluate_pron import evaluate_pronunciation
from services.extract_graph import extract_waveform, extract_pitch_graph

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

    result_pitch = get_audio_pitch_eval(file_bytes, text, situation)
    result_rhythm = get_audio_rhythm_eval(file_bytes, text, situation)
    result_pronun = evaluate_pronunciation(text, text)
    #TODO: KoSpeech 모델 완성되면 result_pronun 수정

    waveform_path=os.path.join('..', 'backend', 'DamSeol', 'uploads', 'waveform', 'waveform.png')
    pitch_graph_path=os.path.join('..', 'backend', 'DamSeol', 'uploads', 'pitch', 'pitch.png')
    extract_waveform(audio_file=file_bytes, save_path=waveform_path)
    extract_pitch_graph(audio_file=file_bytes, save_path=pitch_graph_path)

    response = jsonify({
        "status": "success", 
        "pitch": result_pitch, 
        "rhythm": result_rhythm, 
        "pronun": result_pronun, 
        "waveform_path": waveform_path, 
        "pitch_graph_path": pitch_graph_path})
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

@api_blueprint.route('/eval-pronun', methods=['POST'])
def eval_pronun():
    text_original = request.form.get('text_original', None)
    text_input = request.form.get('text_input', None)

    result = evaluate_pronunciation(text_original, text_input)

    response = jsonify({"status": "success", "result": result})
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response