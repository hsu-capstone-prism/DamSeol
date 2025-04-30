import requests

def upload_file_url(file_path, url):
    """
    파일을 업로드하는 함수
    """
    # 파일을 업로드하기 위한 파라미터
    files = {'file': open(file_path, 'rb')}

    # 파일 업로드 요청 보내기
    response = requests.post(url, files=files)

    if response.status_code == 200:
        print("파일 업로드 성공!")
        print(response.text)
    else:
        print(f"파일 업로드 실패. 상태 코드: {response.status_code}")

    # 파일 닫기
    files['file'].close()

    return response


def upload_file_path(file_path, target_path):
    """
    파일을 로컬 경로로 업로드하는 함수
    """
    try:
        with open(file_path, 'rb') as source_file:
            with open(target_path, 'wb') as target_file:
                target_file.write(source_file.read())
        print("파일이 로컬 경로로 성공적으로 업로드되었습니다.")
    except Exception as e:
        print(f"파일 업로드 중 오류가 발생했습니다: {e}")