import platform
import sys
from app import app


if platform.system() == 'Windows':
    from waitress import serve
    print("Starting Waitress server...")

    try:
      print("🔵 Waitress 서버 실행 중 (Windows)")
      serve(app, host='127.0.0.1', port=5000, threads=2)
    except Exception as e:
      print(f"🔴 서버 실행 중 오류 발생: {e}")
else:
    from gunicorn.app.wsgiapp import run
    print("🟢 Gunicorn 서버 실행 중 (Linux/macOS)")

    sys.argv = [
       'gunicorn',
       'app:app',
       '-b', '127.0.0.1:5000',
       '-w', '4',
    ]
    run()