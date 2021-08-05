/**
 * This file defines the model for Dow Jones Index
 */

const Sequelize = require("sequelize");

const db = require("../index");
const assert = require("assert");

const generateDollarSetter = (fieldName) => {
  return function (val) {
    assert(val[0] === "$");
    const result = parseFloat(val.slice(1));
    this.setDataValue(fieldName, result);
  };
};

const generateNullableSetter = (fieldName) => {
  return function (val) {
    if (val === "") return;
    this.setDataValue(fieldName, val);
  };
};

const Record = db.define("record", /* attributes */ {
  quarter: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  stock: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  open: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    set: generateDollarSetter("open")
  },
  high: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    set: generateDollarSetter("high")
  },
  low: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    set: generateDollarSetter("low")
  },
  close: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    set: generateDollarSetter("close")
  },
  volume: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  percent_change_price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  percent_change_volume_over_last_wk: {
    type: Sequelize.DOUBLE,
    allowNull: true,
    set: generateNullableSetter("percent_change_volume_over_last_wk")
  },
  previous_weeks_volume: {
    type: Sequelize.DOUBLE,
    allowNull: true,
    set: generateNullableSetter("previous_weeks_volume")
  },
  next_weeks_open: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    set: generateDollarSetter("next_weeks_open")
  },
  next_weeks_close: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    set: generateDollarSetter("next_weeks_close")
  },
  percent_change_next_weeks_price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  days_to_next_dividend: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  percent_return_next_dividend: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
}, /* index */ {
  indexes: [
    {
      unique: false,
      fields: ["stock"]
    }
  ]
});

module.exports = exports = Record;
