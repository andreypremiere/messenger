import URLS from "../../urls";


export async function verifyCodeRequest(data) {
    try {
        const response = await fetch(URLS.verifyCode, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('Ошибка с сервером:', errorData);
            return null;
        }

        const token = await response.json();
        console.log('Ответ получен:', token);
        return token;
    } catch (error) {
        console.error('Ошибка в запросе:', error);
    }
} 