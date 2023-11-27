# Use a imagem oficial do Node.js como base
FROM node:18-slim

# Crie um diretório de trabalho na imagem
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie todo o código da aplicação, incluindo o arquivo app.js, para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm","start"]
