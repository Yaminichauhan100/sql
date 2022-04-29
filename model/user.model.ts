
import { Model, DataTypes, UUIDV4 } from "sequelize"
import { sequelize } from '../connection/mariadb.connection'
import { Device } from "./device.model"


export class User extends Model {
  uuid:String|undefined
  firstName: String | undefined
  lastName: String | undefined
  email: String | undefined
  password: String | undefined
}

User.init({
  _id:{
    type: DataTypes.UUID,
    defaultValue:UUIDV4
  } ,  
  firstName: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(25),
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: { type:DataTypes.DATE(6), field: 'created_at' },
  updatedAt: { type:DataTypes.DATE(6), field: 'created_at' },
},
  {
    sequelize,
    tableName: "user"
  });

User.hasMany(Device, {foreignKey: 'user_id'});
Device.belongsTo(User, {targetKey:'_id',foreignKey: 'user_id'});
User.sync({alter:true,force:false});
Device.sync({alter:true,force:false});

export const ParentConstructorName = User.name;




