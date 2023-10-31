# Use a imagem Node.js 16.14-alpine como base
FROM node:16.14-alpine

# Defina o diretório de trabalho no contêiner como /app-frontend
WORKDIR /app-frontend

# Copie os arquivos package.json e package-lock.json para o contêiner
COPY package.json package-lock.json ./

# Instale as dependências Node
RUN npm install

# Copie o restante dos arquivos da aplicação para o contêiner
COPY . .

# Exponha a porta 3000, que a aplicação irá ouvir
EXPOSE 3000

# Configure o comando para iniciar a aplicação de acordo com as boas práticas
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
