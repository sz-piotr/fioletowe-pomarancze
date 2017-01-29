"""empty message

Revision ID: cc60c34245c1
Revises: 2f42460d9060
Create Date: 2017-01-28 22:46:09.750776

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cc60c34245c1'
down_revision = '2f42460d9060'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('group', sa.Column('name', sa.String(length=80), nullable=False))
    op.add_column('group', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_unique_constraint('group_name_user_id_uc', 'group', ['name', 'user_id'])
    op.create_foreign_key(None, 'group', 'user', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'group', type_='foreignkey')
    op.drop_constraint('group_name_user_id_uc', 'group', type_='unique')
    op.drop_column('group', 'user_id')
    op.drop_column('group', 'name')
    # ### end Alembic commands ###