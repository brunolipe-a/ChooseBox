import Box from '../models/Box';

class BoxController {
    async index (req, res) {
        let boxes = await Box.find();

        return res.json(boxes);
    }

    async store (req, res) {
        await Box.create(req.body, function (err, box) {
            if(err){
                return res.json({ error :err });
            }
            else {
                req.io.sockets.emit('box', box);
                return res.json(box);
            }
        });
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

            req.io.sockets.emit('deleteBox', box._id);
            req.io.sockets.in(box._id).emit('beenDelete', true);

            return res.json({ msg: `Box '${box.title}' deletado com sucesso!` })
        }
        catch (e) {
            return res.json({ msg: `Houve erro ao deletatr o Box '${box.title}'`, error: e })
        }
    }

    async check (req, res) {
        const box = await Box.findOne({ title: req.body.title });

        return res.json({ "exists": !!box, "_id": box ? box.id : box});
    }
}

export default new BoxController();