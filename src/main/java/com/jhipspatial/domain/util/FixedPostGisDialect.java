package com.jhipspatial.domain.util;

import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.spatial.dialect.postgis.PostgisDialect;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.descriptor.sql.BinaryTypeDescriptor;
import org.hibernate.type.descriptor.sql.SqlTypeDescriptor;

import java.sql.Types;

public class FixedPostGisDialect extends PostgisDialect {

    public FixedPostGisDialect() {
        super();
        registerColumnType(Types.BLOB, "bytea");
        registerFunction("asgeojson", new StandardSQLFunction("st_asgeojson", StandardBasicTypes.STRING));
        registerFunction("askml", new StandardSQLFunction("st_askml", StandardBasicTypes.STRING));
        registerFunction("srid", new StandardSQLFunction("st_srid", StandardBasicTypes.INTEGER));
        registerFunction("dwithin", new StandardSQLFunction("st_dwithin", StandardBasicTypes.BOOLEAN));

    }

    @Override
    public SqlTypeDescriptor remapSqlTypeDescriptor(SqlTypeDescriptor sqlTypeDescriptor) {
        if (sqlTypeDescriptor.getSqlType() == Types.BLOB) {
            return BinaryTypeDescriptor.INSTANCE;
        }
        return super.remapSqlTypeDescriptor(sqlTypeDescriptor);
    }
}
