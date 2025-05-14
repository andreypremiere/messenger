import asyncio

import numpy as np
import torch
from quart import current_app
from torch.utils.data import Dataset, DataLoader


class DatasetData(Dataset):
    def __init__(self, X):
        self.X = np.array(X, dtype=np.float32)

    def __len__(self):
        return len(self.X)

    def __getitem__(self, index):
        return self.X[index].transpose()


def process_data(documents):
    final_result = []
    model = current_app.model
    device = torch.device('cuda')

    for item in documents:
        dataset = DatasetData(item['data'])
        data_loader = DataLoader(dataset, batch_size=32, shuffle=False)
        result = start_predict(model, data_loader, device)
        print(f'Предсказанные значения для одного документа: {len(item["data"])}, {len(result)}')
        final_result.append({"name": item['name'][:-5] + '_pred' + '.json', 'data': result})

    print('final_result', final_result)
    return final_result


def start_predict(model, data_loader, device):
    model.to(device)
    model.eval()
    result = []
    with torch.no_grad():
        for x in data_loader:
            x = x.to(device)

            logits = model(x)
            pred_classes = logits.argmax(dim=1)
            result.extend(pred_classes.tolist())

    return result
