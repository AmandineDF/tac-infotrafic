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
                
                # Titre et description (avec replis sécurisés)
                header = alert.header_text.translation[0].text if alert.header_text.translation else "Information réseau"
                description = alert.description_text.translation[0].text if alert.description_text.translation else ""
                
                # Effet (ex: DIVERSION, SIGNIFICANT_DELAYS, NO_SERVICE...)
                # On convertit l'énumération protobuf en texte lisible
                effect = gtfs_realtime_pb2.Alert.Effect.Name(alert.effect) if hasattr(alert, 'effect') else "OTHER"
                
                # Cause de l'alerte (ex: WORKS, STRIKE...)
                cause = gtfs_realtime_pb2.Alert.Cause.Name(alert.cause) if hasattr(alert, 'cause') else "UNKNOWN_CAUSE"
                
                # Périodes de validité (dates de début et de fin)
                periods = []
                for period in alert.active_period:
                    periods.append({
                        "start": period.start if period.HasField('start') else None,
                        "end": period.end if period.HasField('end') else None
                    })
                
                # Lignes impactées (route_id)
                routes = []
                for entity_selector in alert.informed_entity:
                    if entity_selector.HasField('route_id'):
                        routes.append(entity_selector.route_id)

                alerts_list.append({
                    "title": header,
                    "description": description,
                    "effect": effect,
                    "cause": cause,
                    "active_periods": periods,
                    "routes": routes
                })
        
        # Enregistre le tout dans src/alertes.json
        with open("src/alertes.json", "w", encoding="utf-8") as f:
            json.dump(alerts_list, f, ensure_ascii=False, indent=4)
        print("Fichier alertes.json mis à jour avec les détails enrichis !")
    else:
        print(f"Erreur HTTP : {response.status_code}")

if __name__ == "__main__":
    fetch_and_save_alerts()