import { Model, DataType, DataTypes, UUID } from "sequelize"
import { sequelize } from '../connection/mariadb.connection'
import {User} from "./user.model"


export class Device extends Model {
  static findByIdAndUpdate(_id: any, body: any) {
    throw new Error("Method not implemented.")
  }
  static findById(_id: any) {
    throw new Error("Method not implemented.")
  }

  uuid:number|undefined
  user_id:number|undefined
  device_type: String | undefined
  device_model: number | undefined
  device_name: String | undefined
}

Device.init({
  _id: {
    type: DataTypes.UUID,
    primaryKey: true
    }, 
  user_id:{
      type:DataTypes.UUID(),
      allowNull: false
  },
  device_type: {
    type: DataTypes.STRING(25),
    // allowNull: false
  },
  device_model: {
    type: DataTypes.STRING(25)
  },
  device_name: {
    type: DataTypes.STRING(25),
    // allowNull: false
  },
  
},

  {
    sequelize,
    tableName: "device"
  }, 
)

Device.sync({alter:true});
export const ParentConstructorName = Device.name;