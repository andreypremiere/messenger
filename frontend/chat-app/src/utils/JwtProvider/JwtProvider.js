export function decodeJWT(token) {
    try {
      // JWT состоит из трёх частей, разделённых точкой: header.payload.signature
      const [header, payload, signature] = token.split('.');
  
      // Декодируем payload (вторая часть) из Base64
      const decodedPayload = atob(payload);
      
      // Парсим JSON из строки
      const parsedPayload = JSON.parse(decodedPayload);
  
      // Возвращаем данные
      return {
        userId: parsedPayload.userId,
        nickname: parsedPayload.nickname,
        exp: parsedPayload.exp // время истечения в секундах (Unix timestamp)
      };
    } catch (error) {
      console.error('Ошибка при декодировании токена:', error);
      return null;
    }
  }