import os
import json
from flask import send_from_directory

def get_albums_data(base_path='static/songs'):
    albums = []
    if not os.path.exists(base_path):
        return albums

    for folder in os.listdir(base_path):
        folder_path = os.path.join(base_path, folder)
        if os.path.isdir(folder_path):
            info_path = os.path.join(folder_path, 'info.json')
            cover_path = os.path.join(folder_path, 'cover.jpg')
            if os.path.exists(info_path):
                with open(info_path, 'r') as f:
                    info = json.load(f)
            else:
                info = {"title": folder, "description": ""}
            info["folder"] = folder
            info["cover"] = f"/songs/{folder}/cover.jpg" if os.path.exists(cover_path) else None
            albums.append(info)
    return albums

def get_songs_in_album(album, base_path='static/songs'):
    folder_path = os.path.join(base_path, album)
    if not os.path.exists(folder_path):
        return []

    return [f for f in os.listdir(folder_path) if f.endswith('.mp3')]
