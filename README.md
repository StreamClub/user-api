# user-api

[![codecov](https://codecov.io/gh/StreamClub/user-api/graph/badge.svg?token=VSM0K25UPK)](https://codecov.io/gh/StreamClub/user-api)

Para correr ejecutar:

```
docker-compose up
```

Para matarlo ejecutar el siguiente comando:

```
sudo docker ps
```

De ahi tomar el CONTAINER ID de la uapi y ejecutar:

```
sudo docker kill <container id>
```

Si por algun motivo tienen que borrar todas las imagenes ejecutar:

```
sudo docker system prune -a --volumes
```
