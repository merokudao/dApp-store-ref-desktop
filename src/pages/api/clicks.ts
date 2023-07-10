import { getClickDb, Click } from "../../api/verida";

export default async function clicks(req, res) {
    const database =await getClickDb()
    const results = <Click[]> await database.getMany()

    res.status(200).json({ results })
}