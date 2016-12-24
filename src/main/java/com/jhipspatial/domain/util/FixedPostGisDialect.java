package com.jhipspatial.domain.util;

import org.hibernate.spatial.dialect.postgis.PostgisDialect;
import org.hibernate.type.descriptor.sql.BinaryTypeDescriptor;
import org.hibernate.type.descriptor.sql.SqlTypeDescriptor;

import java.sql.Types;

public class FixedPostGisDialect extends PostgisDialect {

    public FixedPostGisDialect() {
        super();
        registerColumnType(Types.BLOB, "bytea");
    }

    @Override
    public SqlTypeDescriptor remapSqlTypeDescriptor(SqlTypeDescriptor sqlTypeDescriptor) {
        if (sqlTypeDescriptor.getSqlType() == Types.BLOB) {
            return BinaryTypeDescriptor.INSTANCE;
        }
        return super.remapSqlTypeDescriptor(sqlTypeDescriptor);
    }
}
