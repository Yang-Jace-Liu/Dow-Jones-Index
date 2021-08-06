const schema = {
  quarter: {
    isInt: {
      options: {
        lt: 5,
        gt: 0
      }
    },
    toInt: true,
    errorMessage: "quarter has to be an integer between 1 and 4."
  },
  stock: {
    notEmpty: true,
    errorMessage: "stock cannot be empty."
  },
  date: {
    notEmpty: true,
    matches: {
      options: /\d{4}-\d{2}-\d{2}/, // TODO: Need more precise pattern
      errorMessage: "date should follow the pattern yyyy-mm-dd."
    }
  },
  open: {
    isFloat: true,
    toFloat: true,
    errorMessage: "open should be a float number."
  },
  high: {
    isFloat: true,
    toFloat: true,
    errorMessage: "high should be a float number."
  },
  low: {
    isFloat: true,
    toFloat: true,
    errorMessage: "low should be a float number."
  },
  close: {
    isFloat: true,
    toFloat: true,
    errorMessage: "close should be a float number."
  },
  volume: {
    isInt: true,
    toInt: true,
    errorMessage: "volume should be an integer."
  },
  percent_change_price: {
    isFloat: true,
    toFloat: true,
    errorMessage: "percent_change_price should be a float number."
  },
  percent_change_volume_over_last_wk: {
    optional: {
      options: {
        nullable: true
      }
    },
    isFloat: true,
    toFloat: true,
    errorMessage: "percent_change_price should be a float number."
  },
  previous_weeks_volume: {
    optional: {
      options: {
        nullable: true
      }
    },
    isFloat: true,
    toFloat: true,
    errorMessage: "previous_weeks_volume should be a float number."
  },
  next_weeks_open: {
    isFloat: true,
    toFloat: true,
    errorMessage: "next_weeks_open should be a float number."
  },
  next_weeks_close: {
    isFloat: true,
    toFloat: true,
    errorMessage: "next_weeks_close should be a float number."
  },
  percent_change_next_weeks_price: {
    isFloat: true,
    toFloat: true,
    errorMessage: "percent_change_next_weeks_price should be a float number."
  },
  days_to_next_dividend: {
    isInt: true,
    toInt: true,
    errorMessage: "days_to_next_dividend should be an integer."
  },
  percent_return_next_dividend: {
    isFloat: true,
    toFloat: true,
    errorMessage: "percent_return_next_dividend should be a float number."
  }
};

module.exports = exports = schema;
