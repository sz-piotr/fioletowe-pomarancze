"""empty message

Revision ID: 7e179bd03a33
Revises: b29e2cd89991
Create Date: 2017-01-28 16:17:22.257322

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7e179bd03a33'
down_revision = 'b29e2cd89991'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('name_user_uc', 'device', ['name', 'user_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('name_user_uc', 'device', type_='unique')
    # ### end Alembic commands ###