function convertToJejemon(text) {
    return text.replace(/[aeiouylw]/gi, function (vowel) {
        switch (vowel.toLowerCase()) {
            case 'a':
                return '4';
            case 'e':
                return '3';
            case 'i':
                return '1';
            case 'o':
                return '0';
            case 'u':
                return '2';
            case 'y':
                return '7';
            case 'l':
                return '8';
            case 'w':
                return '9';
            default:
                return vowel;
        }
    });
}

exports.name = '/jeje'; 
exports.index =  (req, res) => {
    try {
        const text = req.query.text;
        if (!text) {
            return res.status(400).json({ error: '/jeje?text=your text' });
        }
        const jejemonizedText = convertToJejemon(text);
        res.json({ original: text, jejemon: jejemonizedText });
    } catch (error) {
        res.json({error: error});
    }
};