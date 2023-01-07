exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('files', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    extension: { type: 'varchar(10)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createTable('user_files', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
    },
    file_id: {
      type: 'integer',
      notNull: true,
      references: 'files',
      onDelete: 'cascade',
    },
    owner: {
      type: 'bool',
      notNull: true,
    },
  });
  pgm.createIndex('user_files', ['user_id', 'file_id'], { unique: true });
};

exports.down = (pgm) => {
  pgm.dropTable('user_files');
  pgm.dropTable('files');
};
