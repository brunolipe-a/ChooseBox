import File from '../models/File';
import Box from '../models/Box';

class FileController {
    async store (req, res) {
        const { originalname: title, key: path, location: url } = req.file;

        const box = await Box.findById(req.params.id);
        const file = await File.create({
            title,
            path,
            url,
        });
        box.files.push(file);

        await box.save();

        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }

    async delete (req, res) {
        const file = await File.findById(req.params.id);

        try {
            await file.remove();

            return res.json({ msg: `Arquivo '${file.title}' deletado com sucesso!` })
        }
        catch (e) {
            return res.json({ msg: `Houve erro ao deletatr o Arquivo '${file.title}'`, error: e })
        }
    }
}

export default new FileController();