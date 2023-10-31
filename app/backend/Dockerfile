# Use a imagem Node.js 16.14-alpine como base
FROM node:16.14-alpine

# Defina o diretório de trabalho no contêiner como /app-backend
WORKDIR /app-backend

# Copie os arquivos package.json, package-lock.json e packages.npm para o contêiner
COPY package.json package-lock.json packages.npm ./

# Instale as dependências Node
RUN npm install

# Copie o restante dos arquivos da aplicação para o contêiner
COPY . .

# Exponha a porta 3001, que a aplicação irá ouvir
EXPOSE 3001

# Configure o comando para iniciar a aplicação de acordo com as boas práticas
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
