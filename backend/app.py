import time
import cv2 
from flask import Flask, render_template, Response,request,jsonify
from flask_cors import CORS
import os
from service import platform_detection,queue_detection
from streaming import Stream
app = Flask(__name__)
CORS(app)

stream = Stream(True)


def gen(video_path):
    """Video streaming generator function."""
    
    
    cap = cv2.VideoCapture(video_path)

    # Read until video is completed
    while(cap.isOpened()):
        ret, img = cap.read()
        if ret == True:
            img = cv2.resize(img, (0,0), fx=0.5, fy=0.5) 
            frame = cv2.imencode('.jpg', img)[1].tobytes()
            yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else: 
            break
        

# @app.route('/video_feed/escalator')
# def video_feed_escalator():
#     """Video streaming route. Put this in the src attribute of an img tag."""
#     return Response(gen("E"),
#                     mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/platform')
def video_feed_platform():
    """Video streaming route. Put this in the src attribute of an img tag."""
    # file = os.listdir(os.path.join(os.getcwd(),'videos','Platform'))[0]
    # file = os.path.join(os.getcwd(),'videos','Platform',file)
    stream.is_streaming=True
    return Response(platform_detection(stream),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/ticket')
def video_feed_ticket():
    """Video streaming route. Put this in the src attribute of an img tag."""
    # file = os.listdir(os.path.join(os.getcwd(),'videos','Abandon'))[0]
    # file = os.path.join(os.getcwd(),'videos','Abandon',file)
    stream.is_streaming=True
    return Response(queue_detection(stream),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/lostbaggage')
def video_feed_lostbaggage():
    """Video streaming route. Put this in the src attribute of an img tag."""
    file = os.listdir(os.path.join(os.getcwd(),'videos','Queue'))[0]
    file = os.path.join(os.getcwd(),'videos','Queue',file)
    return Response(gen(file),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/upload',methods=['POST'])
def video_feed_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    video_type = request.form['type']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file:
        filename = file.filename
        file.save(os.path.join(os.getcwd(),'videos',video_type, filename))
        return jsonify({'message': 'File uploaded successfully', 'filename': filename})
    
@app.route('/video_feed/stop',methods=['POST'])
def stop_streaming():
    # with open('./points_data/is_streaming.json', 'w') as f:
    #     json.dump(False, f)
    stream.is_streaming=False
    return 'Streaming stopped', 200
    


if __name__ == '__main__':
    app.run(debug=True)