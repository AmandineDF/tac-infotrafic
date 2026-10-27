import json
import requests
from google.transit import gtfs_realtime_pb2

url = "https://proxy.transport.data.gouv.fr/resource/annemasse-tp2a-gtfs-rt-alerts"

def fetch_and_save_alerts():
    response = requests.get(url)
    if response.status_code == 200:
        feed = gtfs_realtime_pb2.FeedMessage()
        feed.ParseFromString(response.content)
        
        alerts_list = []
        for entity in feed.entity:
            if entity.HasField('alert'):
                alert = entity.alert
                header = alert.header_text.translation[0].text if alert.header_text.translation else "Alerte info"
                description = alert.description_text.translation[0].text if alert.description_text.translation else ""
                
                alerts_list.append({
                    "title": header,
                    "description": description
                })
        
        # Enregistre le fichier alertes.json à la racine du projet
        with open("alertes.json", "w", encoding="utf-8") as f:
            json.dump(alerts_list, f, ensure_ascii=False, indent=4)
        print("Fichier alertes.json mis à jour avec succès !")
    else:
        print(f"Erreur HTTP : {response.status_code}")

if __name__ == "__main__":
    fetch_and_save_alerts()