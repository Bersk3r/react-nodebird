// module.exports = (sequelize, DataTypes) => {
//     const Image = sequelize.define('Image', { // MySQL에는 users 테이블 생성
//         // id가 기본적으로 들어 있음
//         src : {
//             type: DataTypes.STRING(200),
//             allowNull: false,
//         },
//     }, {
//         charset: 'utf8',
//         collate: 'utf8_general_ci', // 경로 저장
//
//     });
//     Image.associate = (db) => {
//         db.Image.belongsTo(db.Post);
//     };
//     return Image;
// }

const DataTypes = require('sequelize');
const { Model } = DataTypes;
module.exports = class Image extends Model {
    static init(sequelize) {
        return super.init({
            src : {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            // : {}
            // PostId: {}
        }, {
            modelName: 'Image',
            tableName: 'images',
            charset: 'utf8',
            collate: 'utf8_general_ci', // 경로 저장
            sequelize,
        });
    }

    static associate(db) {
        db.Image.belongsTo(db.Post);
    }
};