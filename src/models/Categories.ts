class Categories {
  getSaison() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    if (month >= 5) {
      return `${year}-${year + 1}`;
    }
    return `${year - 1}-${year}`;
  }

  getCategories(cat: string, years: number): string[] {
    let birthYears = [];
    let saison = Number(this.getSaison().split('-')[0]);

    if (cat.startsWith('U')) {
      let ageMax = Number(cat.slice(1)) - 1;
      let yearMax = saison - ageMax;

      for (let i = 0; i < years; i++) {
        birthYears.push(String(yearMax + i));
      }
    } else {
      return ['Adulte'];
    }

    return birthYears;
  }

  getYears(cat: string): string[] {
    let years = [];
    console.log(cat);

    if (cat.includes('U07')) {
      years.push(...this.getCategories('U07', 2));
    }
    if (cat.includes('U09')) {
      years.push(...this.getCategories('U09', 2));
    }
    if (cat.includes('U11')) {
      years.push(...this.getCategories('U11', 2));
    }
    if (cat.includes('U13')) {
      years.push(...this.getCategories('U13', 2));
    }
    if (cat.includes('U15')) {
      years.push(...this.getCategories('U15', 2));
    }
    if (cat.includes('U17')) {
      years.push(...this.getCategories('U17', 2));
    }
    if (cat.includes('U18')) {
      years.push(...this.getCategories('U18', 3));
    }
    if (cat.includes('U21')) {
      years.push(...this.getCategories('U21', 3));
    }
    if (cat.toUpperCase().includes('SENIOR') || cat.toUpperCase().includes('LOISIRS')) {
      years.push('Adulte');
    }

    return years;
  }
}

const categories = new Categories();

export default categories;
