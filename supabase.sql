/*
=====================================
 TRUSTNOVA BANK
 DATABASE STRUCTURE
=====================================
*/


/* =========================
   USERS TABLE
========================= */

create table if not exists users (

    user_id uuid primary key references auth.users(id)
    on delete cascade,

    first_name text not null,

    last_name text not null,

    email text unique not null,

    phone text,

    profile_photo text,

    nationality text,

    status text default 'Active',

    created_at timestamp default now()

);







/* =========================
   ACCOUNTS TABLE
========================= */

create table if not exists accounts (

    account_id uuid primary key default gen_random_uuid(),

    user_id uuid references users(user_id)
    on delete cascade,

    account_number text unique not null,

    account_type text default 'Checking',

    balance numeric(12,2) default 0.00,

    currency text default 'USD',

    status text default 'Active',

    created_at timestamp default now()

);







/* =========================
   TRANSACTIONS TABLE
========================= */

create table if not exists transactions (

    transaction_id uuid primary key default gen_random_uuid(),

    account_id uuid references accounts(account_id)
    on delete cascade,

    transaction_type text,

    description text,

    amount numeric(12,2),

    status text default 'Pending',

    transaction_date timestamp default now()

);







/* =========================
   ADMINS TABLE
========================= */

create table if not exists admins (

    admin_id uuid primary key default gen_random_uuid(),

    user_id uuid references auth.users(id)
    on delete cascade,

    full_name text,

    email text unique,

    role text default 'Admin',

    created_at timestamp default now()

);







/* =========================
   ENABLE SECURITY
========================= */

alter table users enable row level security;

alter table accounts enable row level security;

alter table transactions enable row level security;

alter table admins enable row level security;







/* =========================
   USER POLICIES
========================= */


/* User can view own profile */

create policy "Users view own profile"

on users

for select

using (

auth.uid() = user_id

);





/* User can update own profile */

create policy "Users update own profile"

on users

for update

using (

auth.uid() = user_id

);







/* =========================
   ACCOUNT POLICIES
========================= */


create policy "Users view own accounts"

on accounts

for select

using (

auth.uid() = user_id

);







/* =========================
   TRANSACTION POLICIES
========================= */


create policy "Users view own transactions"

on transactions

for select

using (

account_id in (

select account_id

from accounts

where user_id = auth.uid()

)

);







/* =========================
   ADMIN ACCESS
========================= */


create policy "Admins view everything"

on users

for all

using (

exists (

select 1

from admins

where admins.user_id = auth.uid()

)

);



create policy "Admins manage accounts"

on accounts

for all

using (

exists (

select 1

from admins

where admins.user_id = auth.uid()

)

);



create policy "Admins manage transactions"

on transactions

for all

using (

exists (

select 1

from admins

where admins.user_id = auth.uid()

)

);
