from Video_Stream import video_stream
import os

def setup_platform():
    try:
        file = os.listdir(os.path.join(os.getcwd(),'videos','Platform'))[0]
    except:
        print("Folder is empty")
    file = os.path.join(os.getcwd(),'videos','Platform',file)   
    video_path = file
    print(file)
    output_path='./points_data/edge_points.json'
    img_path = './ref_img/platform_frame.jpg'
    video_stream(video_path,img_path,output_path)

def setup_queue():
    file = os.listdir(os.path.join(os.getcwd(),'videos','Queue'))[0]
    file = os.path.join(os.getcwd(),'videos','Queue',file)   
    video_path = file
    output_path='./points_data/polygon_points.json'
    img_path = './ref_img/queue_frame.jpg'
    video_stream(video_path,img_path,output_path)


setup_platform()
setup_queue()
