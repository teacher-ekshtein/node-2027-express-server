const productsArr = [
    { id: 1, name: 'milk', price: 7 },
    { id: 2, name: 'chocolate', price: 10.5 },
    { id: 3, name: 'cheese', price: 6 },
];

export const getProducts = (req, res) => {
    const { page = 1, limit = 10, sort } = req.query;
    // זהה לשורה שלעיל
    // const page = req.query.page ?? 1;
    // const limit = req.query.limit ?? 10;
    // const sort = req.query.sort;

    // slice - חותך את המערך ממיקום עד מיקום
    const result = productsArr.slice((page - 1) * limit, page * limit);

    // כשמבצעים עימוד מקובל להחזיר גם כמה נתונים יש בסה"כ
    // בשביל שהקליינט ידע כמה עמודים להציג
    res.json({ data: result, total: productsArr.length });
};

export const addProduct = (req, res) => {
    console.log(req.body);

    if (req.body.id && req.body.name && req.body.price) {
        productsArr.push(req.body);
        res.status(201).json(req.body);
    } else {
        res.status(409).json({ error: 'missing data' });
    }
};

export const updateProduct = (req, res) => {
    const id = +req.params.id;

    const index = productsArr.findIndex(p => p.id === id);

    // TODO: check validations before add
    productsArr[index] = req.body;

    res.json(req.body);
};

export const deleteProduct = (req, res) => {
    // זו הדרך לקבל פרמטרים חובה מהיו-אר-אל
    const id = +req.params.iddddd; // + ממיר מחרוזת למספר

    const index = productsArr.findIndex(p => p.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'product not found' });
    } else {
        productsArr.splice(index, 1); // מחיקה
        res.status(204).json();
    }
};