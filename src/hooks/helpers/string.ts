export class CaseConversion {
    private str: string;
  
    constructor(str: string) {
      this.str = str;
    }
  
    private replaceNonLetterCharTo(to: string): this {
      // Replace all non-letter characters (including dots, underscores, hyphens, and spaces) with any string
      this.str = this.str.replace(/[_\-.\s]/g, to);
      return this;
    }
  
    private addSpacingBeforeCapitals(): this {
      this.str = this.str.replace(/(?<!^)([A-Z])/g, " $1");
      return this;
    }
  
    public toPascalCase(): this {
      this.toLowerCase();
      this.replaceNonLetterCharTo(" ");
  
      // Split the string into an array of words
      const words = this.str.split(" ");
      let pascalCase = "";
  
      for (const word of words) {
        pascalCase += word.charAt(0).toUpperCase() + word.slice(1);
      }
      this.str = pascalCase;
  
      return this;
    }
  
    public toCamelCase(): this {
      this.toLowerCase();
      this.replaceNonLetterCharTo(" ");
  
      // Split the string into an array of words
      const words = this.str.split(" ");
      let camelCase = "";
  
      for (let i = 0; i < words.length; i++) {
        // Capitalize the first letter of the first word
        if (i === 0) {
          camelCase += words[i].toLowerCase();
        } else {
          camelCase += words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
      }
  
      this.str = camelCase;
  
      return this;
    }
  
    public toSnakeCase(): this {
      this.toLowerCase();
      this.replaceNonLetterCharTo("_");
  
      return this;
    }
  
    public toKebabCase(): this {
      this.toLowerCase();
      this.replaceNonLetterCharTo("-");
  
      return this;
    }
  
    public toDotNotation(): this {
      this.toLowerCase();
      this.replaceNonLetterCharTo(".");
  
      return this;
    }
  
    public toTrainCase(): this {
      this.toLowerCase();
  
      // Split the string into an array of words
      const words = this.str.split(" ");
      let trainCase: string[] = [];
      for (const word of words) {
        trainCase.push(word.charAt(0).toUpperCase() + word.slice(1));
      }
  
      this.str = trainCase.join("-");
  
      return this;
    }
  
    public toSentenceCase(): this {
      this.toLowerCase();
      this.str = this.str.replace(
        /(^|\.\s+)(\w)/g,
        (match, separator, firstLetter) => {
          return separator + firstLetter.toUpperCase();
        }
      );
      return this;
    }
  
    public toTitleCase(): this {
      this.toLowerCase();
      this.str = this.str.replace(/\b(\w)/g, (match, firstLetter) => {
        return firstLetter.toUpperCase();
      });
  
      return this;
    }
  
    public toCobolCase(): this {
      this.toUpperCase();
      this.replaceNonLetterCharTo("-");
  
      return this;
    }
  
    public toMacroCase(): this {
      this.toUpperCase();
      this.replaceNonLetterCharTo("_");
  
      return this;
    }
  
    public toLowerCase(): this {
  
      this.replaceNonLetterCharTo(" ");
  
      let words = this.str.split(" ");
      for (let i = 0; i < words.length; i++) {
        if (words[i] === words[i].toUpperCase()) {
          words[i] = words[i].toLowerCase();
        }
      }
      this.str = words.join(" ");
  
      this.addSpacingBeforeCapitals();
      this.str = this.str.toLowerCase().replace(/\s{2,}/g, " ");
  
      return this;
    }
  
    public toUpperCase(): this {
      this.toLowerCase();
      this.str = this.str.toUpperCase().replace(/\s{2,}/g, " ");
  
      return this;
    }
  
    public get(): string {
      return this.str;
    }
  }
  