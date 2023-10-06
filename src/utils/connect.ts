import config from "config"
import mongoose from "mongoose"

const connect = async () => {
  const dbUri = config.get<string>('dbUri')
  console.log({dbUri})

  try {
    await mongoose.connect(dbUri)
    console.log('Connected to DB')
  } catch (error) {
    console.log('DB connection failed')

    console.log(error)
    process.exit(1)
  }

}

export default connect