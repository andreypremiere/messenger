import URLS from "../../urls";

export default async function getUsersByNickname(nickname) {
    try {
        // Отправляем GET запрос на сервер
        const response = await fetch(`${URLS.findUsers}?nickname=${encodeURIComponent(nickname)}`, {
            method: 'GET', // HTTP метод
            headers: {
            'Content-Type': 'application/json', // Указываем тип контента
            }
        });
    
        // Проверяем, что ответ успешный
        if (!response.ok) {
            console.log('Ошибка в ответе');
            return [];
        }
    
        // Парсим ответ в JSON
        const users = await response.json();
        return users;
    } 
    catch (error) {
        console.log('Ошибка в блоке try.');
        return []; 
    }
  }