import time
import cv2 
from flask import Flask, render_template, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def gen_dynamic(video_path):
    """Video streaming generator function."""
    cap = cv2.VideoCapture(video_path)

    
    while(cap.isOpened()):
        ret, img = cap.read()
        if ret == True:
            img = cv2.resize(img, (0,0), fx=0.5, fy=0.5) 
            frame = cv2.imencode('.jpg', img)[1].tobytes()
            yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else: 
            break

def gen(opt):
    """Video streaming generator function."""
    if opt == "T":
        video_path = "D:/MitMetro/newData2/Ticketing_Line_1.avi" 
    if opt == "E":
        video_path = "D:/MitMetro/newdata1/FallOnEscalator_4.avi"
    if opt == "P":
        video_path = "D:/MitMetro/newdata1/PF_EdgeCrossing_6.avi"
    if opt == "L":
        video_path = "D:/MitMetro/newdata1/LeftObject_2.avi"
    
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
    return Response(gen("P"),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/ticket')
def video_feed_ticket():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen("T"),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/lostbaggage')
def video_feed_lostbaggage():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen("L"),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/<option>', methods=['POST'])
def video_feed(option):
    """Video streaming route. Put this in the src attribute of an img tag."""
    if option == 'escalator':
        video_path = "D:/MitMetro/newdata1/FallOnEscalator_4.avi"
    elif option == 'platform':
        video_path = "D:/MitMetro/newdata1/PF_EdgeCrossing_6.avi"
    elif option == 'ticket':
        video_path = "D:/MitMetro/newData2/Ticketing_Line_1.avi"
    elif option == 'lostbaggage':
        video_path = "D:/MitMetro/newdata1/LeftObject_2.avi"
    else:
        return Response("Invalid option", status=400)

    return Response(gen_dynamic(video_path), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(debug=True)