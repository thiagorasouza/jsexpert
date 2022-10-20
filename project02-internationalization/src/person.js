export default class Person {
  constructor({ id, vehicles, kmTraveled, from, to }) {
    this.id = id;
    this.vehicles = vehicles;
    this.kmTraveled = kmTraveled;
    this.from = from;
    this.to = to;
  }

  formatter(language) {
    const listFormatter = new Intl.ListFormat(language, {
      style: "long",
      type: "conjunction",
    });
    // console.log(listFormatter.format(["feijao", "arroz"]));
    const kmFormatter = new Intl.NumberFormat(language, {
      style: "unit",
      unit: "kilometer",
    });
    // console.log(kmFormatter.format(10000));

    const mapDate = (date) => {
      const [year, month, day] = date.split("-").map((item) => Number(item));
      return new Date(year, month - 1, day);
    };

    const dateFormatter = new Intl.DateTimeFormat(language, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    // console.log(dateFormatter.format(mapDate("1993-08-27")));

    return {
      id: Number(this.id),
      vehicles: listFormatter.format(this.vehicles),
      kmTraveled: kmFormatter.format(this.kmTraveled),
      from: dateFormatter.format(mapDate(this.from)),
      to: dateFormatter.format(mapDate(this.to)),
    };
  }
}
