# Sử dụng Node.js phiên bản LTS làm base image
FROM node:18

# Tạo thư mục app trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json (nếu có) vào thư mục app
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn của ứng dụng vào thư mục app trong container
COPY . .

# Expose cổng mà ứng dụng sẽ chạy trên
EXPOSE 3000

# Khởi động ứng dụng
CMD [ "npm", "start" ]
