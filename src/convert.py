from flask import Flask, request, jsonify
import youtube_dl

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert():
    data = request.get_json()
    youtube_url = data['youtubeUrl']  
    
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(youtube_url, download=False)
        video_url = info['formats'][0]['url']
        print(video_url)
        
    return jsonify({'mp3DownloadLink': video_url})

if __name__ == '__main__':
    app.run(debug=True)
