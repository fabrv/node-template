# Note Template

## Dependencies
- Node 14
- Typescript

## Run
1. Clone and go to project directory
2. Install dependencies; rull the following command:
```bash
npm i
```
3. Run in watch mode
```bash
npm run watch
```

## For production
1. Build
```bash
npm run build
```
2. Start
```bash
npm start
```

## Docker
1. Build
```bash
docker build -t node-web-app .
```
2. Run image
```bash
docker run -p 8080:8080 -d node-web-app
```
  
If you need to print the app output
```bash
docker ps
docker logs <container id>
```

## Test service
Navigate to http://localhost:8080 and it should return the following json:
```json
{
    "status":200,
    "message":"Node Template"
}
```