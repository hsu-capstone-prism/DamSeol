import os
import json
from flask import Blueprint, request, jsonify, Response
from werkzeug.utils import secure_filename
from services.evaluate_speech import get_audio_pitch_eval, get_audio_rhythm_eval
from services.evaluate_pron import evaluate_pronunciation
from services.extract_graph import extract_waveform, extract_pitch_graph
from services.get_pronun import get_pronun

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/upload-audio', methods=['POST'])
def upload_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    
    mode = request.form.get('mode', None)
    file = request.files['file']
    text = request.form.get('text', None)
    situation = request.form.get('situation', None)

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if mode not in ['sentence', 'word']:
        return jsonify({"error": "Invalid mode"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join('.', 'data', filename)
    file.save(file_path)

    #file_bytes = file.read()
    user_pronun = get_pronun(file_path)            

    result_pronun = evaluate_pronunciation(text, user_pronun)

    if not isinstance(result_pronun, dict):
        return jsonify({"error": "Invalid pronunciation evaluation result"}), 400

    if mode == 'sentence':
        result_pitch = get_audio_pitch_eval(file_path, user_pronun, situation)
        result_rhythm = get_audio_rhythm_eval(file_path, user_pronun, situation)

        waveform_path=os.path.join('..', 'backend', 'DamSeol', 'uploads', 'waveform', os.path.splitext(filename)[0] + '_waveform.png')
        pitch_graph_path=os.path.join('..', 'backend', 'DamSeol', 'uploads', 'pitch', os.path.splitext(filename)[0] + '_pitch.png')
        extract_waveform(audio_path=file_path, save_path=waveform_path)
        extract_pitch_graph(audio_path=file_path, save_path=pitch_graph_path)

        if not isinstance(result_pitch, dict):
            return jsonify({"error": "Invalid pitch evaluation result"}), 400
        
        if not isinstance(result_rhythm, dict):
            return jsonify({"error": "Invalid rhythm evaluation result"}), 400

        response = Response(
            json.dumps({
                "status": "success", 
                "user_pronun": user_pronun,       # 사용자가 발음한 문장 STT(String)
                "pitch": result_pitch,              # Pitch 평가 결과(Json)
                "rhythm": result_rhythm,            # Rhythm 평가 결과(Json)
                "pronun": result_pronun,            # 발음 평가 결과(Json)
                "waveform_path": waveform_path,         # 웨이브폼 이미지 경로
                "pitch_graph_path": pitch_graph_path    # 피치 그래프 이미지 경로
            }, ensure_ascii=False),
            content_type='application/json; charset=utf-8'
        )

    elif mode == 'word':
        response = Response(
            json.dumps({
                "status": "success", 
                "user_pronun": user_pronun,   # 사용자가 발음한 단어 STT(String)
                "pronun": result_pronun         # 발음 평가 결과(Json)
            }, ensure_ascii=False),
            content_type='application/json; charset=utf-8'
        )

    else:
        return jsonify({"error": "Invalid mode"}), 400
    return response
