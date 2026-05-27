<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('city_id')->nullable();
            $table->string('province_id')->nullable();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->text('shipping_address')->nullable();
            $table->string('shipping_city_id')->nullable();
            $table->string('shipping_province_id')->nullable();
            $table->string('shipping_courier')->nullable();
            $table->string('shipping_service')->nullable();
            $table->integer('shipping_cost')->default(0);
            $table->string('midtrans_transaction_id')->nullable();
            
            if (Schema::hasColumn('orders', 'payment_proof')) {
                $table->dropColumn('payment_proof');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'address', 'city_id', 'province_id']);
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'shipping_address', 
                'shipping_city_id', 
                'shipping_province_id', 
                'shipping_courier', 
                'shipping_service', 
                'shipping_cost', 
                'midtrans_transaction_id'
            ]);
            $table->string('payment_proof')->nullable();
        });
    }
};
