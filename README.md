# process-api

Para correr ejecutar:

```
sudo docker build -t papi .

sudo docker run -p 8080:8080 papi 
```
Para matarlo ejecutar el siguiente comando:
```
sudo docker ps
```
De ahi tomar el CONTAINER ID de la papi y ejecutar:
```
sudo docker kill <container id>
```
Si por algun motivo tienen que borrar todas las imagenes ejecutar:
```
sudo docker system prune -a --volumes
```