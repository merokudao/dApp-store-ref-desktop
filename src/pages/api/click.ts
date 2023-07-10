import { getClickDb, Click } from "../../api/verida";

export default async function click(req, res) {
    if (req.method == 'POST') {
        const click = <Click> {
            dappId: req.body.dappId,
            wallet: req.body.wallet,
            url: req.body.url
        }

        // @todo: validate data

        const database = await getClickDb()
        await database.save(click)
        res.status(200).json({ success: true })
    }
}
