class Tax {
  static get taxesBasedOnAge() {
    return [
      { from: 18, to: 25, multiplier: 1.5 },
      { from: 25, to: 30, multiplier: 1 },
      { from: 50, to: 100, multiplier: 1.3 },
    ];
  }
}

module.exports = Tax;
