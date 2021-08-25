import {Command, flags} from '@oclif/command'
import { count } from 'console'
import { createNoSubstitutionTemplateLiteral, isTemplateExpression } from 'typescript'

const fs = require('fs')
const YAML = require('yaml')



export default class Hello extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ doctrine-orm-conv hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),

    withColumns: flags.boolean({char: 'c'}),
  }

  static args = [{name: 'file'}]

  handleEntityProperties(entity: any, name: string) {
    
    for (const [name, item] of Object.entries(entity?.fields)) {
      //console.log(name, item);

      let type = item.type,
        nullable = false,
        attributes = [`type=\"${type}\"`];

      if(type === 'string') {
        let length = 255;
        if(typeof item.length !== 'undefined') {
          length = item.length;
        }
        attributes.push( "length=" + length );
      }

      if(typeof item.column !== 'undefined') {
        attributes.push( `name="${item.column}"` );
      }
      
      if(typeof item.default !== 'undefined') {
        attributes.push( `default="${item.default}"` );
      }
      if(typeof item.nullable !== 'undefined') {
        attributes.push('nullable=' + item.nullable)
        if(item.nullable === 'true' || item.nullable === true) {
          nullable = true;
        }
      }


      //__(1, "/**");
      // __(1, ` * @ORM\\Column( ${attributes.join(', ')} )`);
      __(1, `/** @ORM\\Column( ${attributes.join(', ')} ) */`);
      //__(1, " */");
      const propertyName = name;
      let defaultValue = null;

      switch(type) {
        case 'text':
          type = 'string';
          if(item.nullable === false || item.nullable === 'false') {
            defaultValue = '""';
          }
          break;
        case 'datetime':
        case 'datetimetz':
          type = 'DateTime';
          break;

        case 'float':
          type = 'float';
          if(item.nullable === false || item.nullable === 'false') {
            defaultValue = item.default ? item.default : '.0';
          }
          break;
            
        case 'integer':
          type = 'int';
          if(item.nullable === false || item.nullable === 'false') {
            defaultValue = item.default ? item.default : '0';
          }
          break;
        case 'boolean':
          type = 'bool';
          if(item.nullable === false || item.nullable === 'false') {
            defaultValue = item.default ? item.default : 'false';
          }
          break;
        
        }
      
      __(1, `private ${nullable ? '?' : ''}${type} $${propertyName} ${defaultValue ? "= " + defaultValue : '' };`);
      __(1, '');


      if(typeof(entity.manyToOne === 'object')) {
        this.handleRelations(entity?.manyToOne);
      }
      /*if(count(entity?.oneToMany) > 0) {
        this.handleRelations(entity?.oneToMany);
      }*/

    }
  }

  handleRelations(fields: Array) {
    for (const [name, item] of Object.entries(fields)) {
      let {targetEntity, joinColumn} = item;
      let nullable = null, attributes = [];

      if(targetEntity[0] !== '\\') targetEntity = '\\' + targetEntity;
      console.log(1, joinColumn)

      if(typeof joinColumn.nullable !== 'undefined') {
        attributes.push('nullable=' + joinColumn.nullable)
        if(item.nullable === 'true' || item.nullable === true) {
          nullable = true;
        }
      }

      __(1, "/**");
      __(1, ` * @ORM\\ManyToOne(targetEntity="${targetEntity}")`)
      //__(1, `/** @ORM\\Column( ${attributes.join(', ')} ) */`);
      __(1, ` * @ORM\\JoinColumn(name="${joinColumn.name}", referencedColumnName="${joinColumn.referencedColumnName}", ${attributes.join(', ')})`);
      __(1, " */");

    }
 

  }


  handleEntity(entity: any, name: string) {
    
    _(0, "@ORM\\Table(");
    _(1, `name=\"${entity.table}\",`);

    // Indixes

    if(typeof entity.indexes !== 'undefined') {
      _(1, `indexes={`);
      for (const [name, item] of Object.entries(entity.indexes)) {
        const c = item.columns.map(c => `"${c}"`).join(', ');
        _(2, `@ORM\\Index(name="${name}", columns={${c}}),`);
      }
      _(1, `},`);
    }

    // unique Constraints
    if(typeof entity.uniqueConstraints !== 'undefined' ) {
      _(1, `uniqueConstraints={`);
      for (const [name, item] of Object.entries(entity.uniqueConstraints)) {
        const c = item.columns.map(c => `"${c}"`).join(', ');
        _(2, `@ORM\\UniqueConstraint(name="${name}", columns={${c}}),`);
      }
      _(1, `},`);

    }

    _(0, ")");
  }

  async run() {
    const {args, flags} = this.parse(Hello)

    const withColumns = !! flags.withColumns

    if (args.file) {

      const file = fs.readFileSync(args.file, 'utf8')
      const data = YAML.parse(file);

      const k = Object.keys(data)
      const v = data[k[0]];
      if(typeof v.type === 'string' && v.type === 'entity') {
        if(withColumns) {
          this.handleEntityProperties(v, k[0]);
        } else {
          this.handleEntity(v, k[0]);
        }
      }
      
    }
  }
}


function _(d: number, s: string) {
  console.log(" * " + " ".repeat(d*4) + s);
}

function __(d: number, s: string) {
  console.log(" ".repeat(d*4) + s);
}