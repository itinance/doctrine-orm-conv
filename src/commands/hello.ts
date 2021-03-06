import {Command, flags} from '@oclif/command'
import { count } from 'console'
import { collapseTextChangeRangesAcrossMultipleVersions, createNoSubstitutionTemplateLiteral, createUnparsedSourceFile, isTemplateExpression } from 'typescript'

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

    replacements: flags.string({
      char: 'r',
      default: '',
    }),
  }

  static args = [{name: 'file'}]

  buildPropertyDeclaration(type: string, item: Object): {string, string} {
    let defaultValue = null;

    switch(type) {
      case 'text':
        type = 'string';
        if(typeof item.nullable !== 'undefined' && (item.nullable === false || item.nullable === 'false')) {
          defaultValue = '""';
        }
        break;
      case 'datetime':
      case 'datetimetz':
        type = 'DateTime';
        break;

      case 'float':
        type = 'float';
        if(typeof item.nullable !== 'undefined' && (item.nullable === false || item.nullable === 'false')) {
          defaultValue = item.default ? item.default : '.0';
        }
        break;
          
      case 'bigint':
      case 'integer':
        type = 'int';
        if(typeof item.nullable !== 'undefined' && (item.nullable === false || item.nullable === 'false')) {
          defaultValue = item.default ? item.default : '0';
        }
        break;
      case 'boolean':
        type = 'bool';
        if(typeof item.nullable !== 'undefined' && (item.nullable === false || item.nullable === 'false')) {
          defaultValue = item.default ? item.default : 'false';
        }
        break;
      
      }
    return {type, defaultValue}
  }

  handleEntityProperties(entity: any, name: string, replacements: Array<string>) {

    __(1, '/**');
    __(1, ' * @ORM\\Id');
    __(1, ' * @ORM\\GeneratedValue');
    __(1, ' * @ORM\\Column(type="integer", nullable=false)');
    __(1, '*/');
    __(1, 'protected int $id;')
    __(1, '');
    	
	  
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
      
      if(typeof item.default !== 'undefined' && item.default !== 'null') {
        attributes.push( `options={"default": "${item.default}"}` );
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

      const {type: newType, defaultValue} = this.buildPropertyDeclaration(type, item)

      __(1, `protected ${nullable ? '?' : ''}${newType} $${name} ${defaultValue ? "= " + defaultValue : '' };`);
      __(1, '');

    }

    if(typeof entity?.manyToOne === 'object') {
      this.handleRelations("ManyToOne", entity?.manyToOne, replacements);
    }
    if(typeof entity?.oneToMany === 'object') {
      this.handleRelations("OneToMany", entity?.oneToMany, replacements);
    }
    if(typeof entity?.oneToOne === 'object') {
      this.handleRelations("OneToOne", entity?.oneToOne, replacements);
    }
    if(typeof entity?.manyToMany === 'object') {
      this.handleRelations("ManyToMany", entity?.manyToMany, replacements);
    }

  }

  replaceItem(targetEntity: string, replacements): string {
    if(typeof replacements[targetEntity] === 'string') {
      return replacements[targetEntity];
    }
    return targetEntity;
  }

  handleRelations(relation: string, fields: Array, replacements: Array<string>) {
    for (const [name, item] of Object.entries(fields)) {
      let {targetEntity, joinColumn, mappedBy, inversedBy} = item;
      let nullable = null, attributes = [], relAttributes=[];

      //if(targetEntity[0] !== '\\') targetEntity = '\\' + targetEntity;
      //console.log(1, joinColumn)

      targetEntity = this.replaceItem(targetEntity, replacements)

      if(typeof inversedBy !== 'undefined') {
        relAttributes.push(`inversedBy="${inversedBy}"`)
      }
      if(typeof mappedBy !== 'undefined') {
        relAttributes.push(`mappedBy="${mappedBy}"`)
      }

      if(typeof joinColumn !== 'undefined' && typeof joinColumn.nullable !== 'undefined') {
        attributes.push('nullable=' + joinColumn.nullable)
        if(joinColumn.nullable === 'true' || joinColumn.nullable === true) {
          nullable = true;
        }
      }

      const relAttributesSep = relAttributes.length > 0 ? ', ' : '';
      const AttributesSep = attributes.length > 0 ? ', ' : '';

      __(1, "/**");
      __(1, ` * @ORM\\${relation}(targetEntity="${targetEntity}"${relAttributesSep}${relAttributes.join(', ')})`)
      
      if(typeof joinColumn !== 'undefined') {
        __(1, ` * @ORM\\JoinColumn(name="${joinColumn.name}", referencedColumnName="${joinColumn.referencedColumnName}"${AttributesSep}${attributes.join(', ')})`);
      } else {
        __(1, ` * @ORM\\JoinTable(name="${name}")`)
      }

      __(1, " */");

      const {type: newType, defaultValue} = this.buildPropertyDeclaration(targetEntity, joinColumn)

      __(1, `protected ${nullable ? '?' : ''}${newType} $${name}${defaultValue ? " = " + defaultValue : '' };`);
      __(1, "");
    } 
  }

  handleEntity(entity: any, name: string, replacements: Array<string>) {
    
    console.log("/**")
    _(0, "@ORM\\Entity()")
    _(0, "@ORM\\Table(");
    _(1, `name=\"${entity.table}\",`);

    // Indexes

    if(typeof entity.indexes !== 'undefined' && entity.indexes !== null) {
      _(1, `indexes={`);
      for (const [name, item] of Object.entries(entity.indexes)) {
        const c = item.columns.map(c => `"${c}"`).join(', ');
        _(2, `@ORM\\Index(name="${name}", columns={${c}}),`);
      }
      _(1, `},`);
    }

    // unique Constraints
    if(typeof entity.uniqueConstraints !== 'undefined' && entity.uniqueConstraints !== null ) {
      _(1, `uniqueConstraints={`);
      for (const [name, item] of Object.entries(entity.uniqueConstraints)) {
        const c = item.columns.map(c => `"${c}"`).join(', ');
        _(2, `@ORM\\UniqueConstraint(name="${name}", columns={${c}}),`);
      }
      _(1, `},`);

    }

    _(0, ")");
    console.log(" */")
  }

  async run() {
    const {args, flags} = this.parse(Hello)

    const withColumns = !! flags.withColumns
    const replacements = [];

    if(typeof flags.replacements === 'string' && flags.replacements.length > 0) {
      const replacementsDefFile = fs.readFileSync(flags.replacements, 'utf8')

      replacementsDefFile.split("\n").map( r => {
        const [source, dest] = r.split("=")
        if(typeof source === 'string' && typeof dest === 'string') {
          replacements[source] = dest;
        }
      })

    }


    if (args.file) {

      const file = fs.readFileSync(args.file, 'utf8')
      const data = YAML.parse(file);

      const k = Object.keys(data)
      const v = data[k[0]];
      if(typeof v.type === 'string' && v.type === 'entity') {
        if(withColumns) {
          this.handleEntityProperties(v, k[0], replacements);
        } else {
          this.handleEntity(v, k[0], replacements);
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