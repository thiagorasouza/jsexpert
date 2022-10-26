class Person {
  constructor([
    name,
    nationality,
    maritalStatus,
    idNumber,
    street,
    buildingNumber,
    neighborhood,
    city,
  ]) {
    this.name = this.capitalizeName(name);
    this.nationality = this.capitalizeFirstLetter(nationality);
    this.maritalStatus = this.capitalizeFirstLetter(maritalStatus);
    this.idNumber = this.keepOnlyDigits(idNumber);
    this.street = this.extractStreet(street);
    this.buildingNumber = buildingNumber;
    this.neighborhood = this.extractNeighborhood(neighborhood);
    this.city = this.capitalizeFirstLetter(city);
  }

  capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  capitalizeName(name) {
    return name.replace(/\w+/g, (str) => {
      const isConnector = ["da", "de", "do", "e"].includes(str);
      if (isConnector) {
        return str;
      } else {
        return this.capitalizeFirstLetter(str);
      }
    });
  }

  keepOnlyDigits(str) {
    return str.replace(/\D/g, "");
  }

  extractNeighborhood(str) {
    const neighborhood = str.match(/(?<=^bairro\s+).*$/i).join();
    return neighborhood;
  }

  extractStreet(str) {
    // console.log("🚀 ~ str", str);
    const street = str
      .match(/(?<=^residente e domiciliad[oa] (?:a|na|no|em) ).*$/i)
      .join();

    return street;
  }
}

module.exports = Person;
