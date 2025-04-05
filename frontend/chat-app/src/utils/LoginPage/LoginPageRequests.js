import URLS from "../../urls";


export async function registerRequest(data) {
    try {
        const response = await fetch(URLS.register, {
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

        const result = await response.json();
        console.log('Ответ получен:', result);
        return result;
    } catch (error) {
        console.error('Ошибка в запросе:', error);
    }
}

