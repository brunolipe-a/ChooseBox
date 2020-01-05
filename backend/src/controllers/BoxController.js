import Box from '../models/Box';

class BoxController {
    async store (req, res) {
        const box = await Box.create(req.body);

        return res.json(box);
    }

    async show (req, res) {
        const box = await Box.findById(req.params.id).populate({
           path: 'files',
           options: {
               sort: { createdAt: -1 }
           }
        });

        return res.json(box);
    }

    async delete (req, res) {
        const box = await Box.findById(req.params.id);

        try {
            await box.remove();

            return res.json({ msg: `Box '${box.title}' deletado com sucesso!` })
        }
        catch (e) {
            return res.json({ msg: `Houve erro ao deletatr o Box '${box.title}'`, error: e })
        }
    }

    async check (req, res) {
        const check = await Box.findOne({ title: req.body.title });

        return res.json(!!check);
    }
}

export default new BoxController();